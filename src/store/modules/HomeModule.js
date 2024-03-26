

const HomeModule = {
    state: {
        //用户信息修改框显示
        userEditVisible: false,
        //商品信息修改框显示
        objectEditVisible: false,
        //用户修改信息
        currentUserInfo: {},
        //商品修改信息
        currentObjectInfo: {},
        listdata: []
    },
    mutations: {
        //修改用户信息
        SET_USEREDIT(state, paylog) { 
            state.userEditVisible = !state.userEditVisible
            state.currentUserInfo = paylog
        },
        //修改商品信息
        SET_OBJECTDIT(state, paylog) {
            state.objectEditVisible = !state.objectEditVisible
            state.currentObjectInfo = paylog
        },
        //设置弹出框是否显示
        DIALOG(state) {
            // state.objectEditVisible = !state.objectEditVisible
            // window.location.reload()
        },
    },
    actions: {
        
    },
    getters: {

    }
}

export default HomeModule