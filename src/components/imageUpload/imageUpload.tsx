import React, { useEffect, useRef, useState } from "react";
import styles from './imageUpload.module.scss'
import { ULTIMATE_UPLOAD_SIZE } from "../../utils/contants";
import { Images } from "../../assets/images";




let nth = 0  //index of each appended image must be outside because we dont want it to be reinitialized after each imageUpload and some images get same indices



type ImageUploadPropsT = {
    id: string | number
    title: React.ReactNode
    buttonText: string
    chooseMulti: boolean
    setFilesArr: (a: any) => void
    filesArr: {
        src: string
        id: string
    }[]
    isValid: boolean
    error: string
}


const ImageUpload: React.FC<ImageUploadPropsT> = (props) => {
    const [areaIsHighlighted, setAreaIsHighlighted] = useState(false)    //state for detecting the drag and drop moments
    const dropAreaEl = useRef<HTMLDivElement>(null)




    //fuction to return a promise of reader obj
    function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                resolve(reader.result)
            }
            reader.onerror = function (err) {
                reject(err)
            }
        })
    }






    //registering event listeners for drop and drag events
    useEffect(() => {
        const dropArea = dropAreaEl.current;
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)!;
        });

        ["dragenter", "dragover"].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ["dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, unHightLight, false);
        });

        dropArea.addEventListener("drop", handleDrop, false);


        return () => {

            ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
                dropArea.removeEventListener(eventName, preventDefaults, false);
            });

            ["dragenter", "dragover"].forEach(eventName => {
                dropArea.removeEventListener(eventName, highlight, false);
            });

            ["dragleave", "drop"].forEach(eventName => {
                dropArea.removeEventListener(eventName, unHightLight, false);
            });

            dropArea.removeEventListener("drop", handleDrop, false);
        }
    }, [])

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }



    const highlight = () => {
        setAreaIsHighlighted(true)
    };

    const unHightLight = () => {
        setAreaIsHighlighted(false)
    };

    //it handles droping files in drop-area
    const handleDrop = e => {
        const dt = e.dataTransfer;
        const { files } = dt;
        handleFiles(files);
    };



    //it removes an specified item from filesArr state and uploadedJsx arr
    const removeHandler = (e, id) => {
        e.preventDefault()
        props.setFilesArr(prev => {
            const newFilteredArr = prev.filter((c, i) => c.id !== id)
            return newFilteredArr
        })

    }

    //its responsible for adding new image while droping or browsing it
    //if totalSize of not exceeded from an ULTIMATE_UPLOAD_SIZE
    const handleFiles = async files => {

        const itemsArr = []
        for (const c of files) {
            try {
                const id = `${props.id}__${nth}`
                const newItem = c
                newItem.id = id
                newItem.src = await uploadFile(c)
                itemsArr.push(newItem)
                nth++
            }
            catch (err) {
                console.error(err)
            }
        }
        props.setFilesArr(prev => {
            if (props.chooseMulti) {
                const newFilesArr = [...prev, ...itemsArr]
                const newTotalSize = newFilesArr.reduce((partialSum, curr) => partialSum + curr.size, 0)
                if (newTotalSize > ULTIMATE_UPLOAD_SIZE) {
                    return prev
                }
                return newFilesArr
            }
            else {
                //if only one image is allowed to be selected
                return [itemsArr[0]]
            }
        })
    };






    let imageItem = (
        <div className={styles.imgSpot} >
            <div className={styles.imgBox}>
                <img className={styles.img} src={Images.SunAndMountain} />
            </div>
        </div>
    )
    if (props.filesArr?.length > 0) {
        const firstFile = props.filesArr[0]
        imageItem = (
            <div className={styles.imgSpot} >
                <div className={styles.imgBox}>
                    <img className={styles.img} src={firstFile.src} />
                    <span className={styles.removeBtn} onClick={(e) => removeHandler(e, firstFile.id)}>❌</span>
                </div>
            </div>
        )
    }





    let inputEl = (<input className={styles.fileInput} type="file" id={`${props.id}-f`} multiple accept="image/*" onChange={e => { handleFiles(e.target.files) }} />)


    if (!props.chooseMulti) {
        inputEl = (<input className={styles.fileInput} type="file" id={`${props.id}-f`} accept="image/*" onChange={e => { handleFiles(e.target.files) }} />)
    }






    return (
        <div className={[styles.imageUpload,
        areaIsHighlighted ? styles.highlighted : '',
        imageItem ? styles.filled : '',

        ].join(' ')} ref={dropAreaEl}>
            {props.title?.toString().length > 0 &&
                <h6 className={styles.header}>{props.title}</h6>

            }
            {inputEl}
            <label className={[styles.fileAreaSpot, props.error ? styles.hasErr : ""].join(' ')} htmlFor={`${props.id}-f`} >
                <div className={styles.fileAreaBox}>
                    <div className={styles.fileArea}>

                    </div>
                </div>
            </label>


            <div className={[styles.imgPanel, props.error ? styles.hasErr : ''].join(' ')}>
                {imageItem}
            </div>

            {/* {
                props.isValid &&
                <div className={notification}>max file size: {ULTIMATE_UPLOAD_SIZE / 1000000} MB</div>
            } */}
            {
                !props.isValid &&
                <div className={styles.err}>{props.error}</div>
            }
        </div>



    );

}



export default ImageUpload
