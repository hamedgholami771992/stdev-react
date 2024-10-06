

export const PATHES = {
  login: '/',
  register: '/register',
  home: '/',
  editPost: "/posts/edit",
  createPost: "/posts/create",
  showPost: "/posts/show"
}


export const LinksArray = [
  {
    name: "posts", 
    value: 1, 
    sublinks: [
      {name: "create", value: PATHES.createPost},
      {name: "show", value: PATHES.showPost},
      {name: "edit", value: PATHES.editPost}
    ]
  }
]


export const PASSWORD_MIN_LENGTH = 8
export const USERNAME_MIN_LENGTH = 5
export const NAME_MIN_LENGTH = 3

export const POST_PER_PAGE = 4
export const ULTIMATE_UPLOAD_SIZE = 100


export const STORAGE_KEYS = {
  user: 'user',
}




