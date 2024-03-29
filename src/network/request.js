import axios from "axios";
import {getToken} from "@/network/auth";
import store from "@/store/index"
import {Message, MessageBox} from "element-ui";

const service = axios.create({
    baseURL: '', //这个baseURL是所有request请求的地址，webpack里的代理看到这个就会进入代理，可以把链接修改成你想要的样子
    timeout: 10000,
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            // let each request carry token
            // ['***'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Sheep-Token'] = getToken()

        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== '200') {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 'F001' || res.code === 'F002' || res.code === '403') {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.response.data.msg || error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
