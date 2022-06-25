import axios from "axios";

const sort = 'abc'

const axiosClient = axios.create({
    baseURL: 'https://randomuser.me/api/',
})

export async function getUsers(params) {
    const {count, page} = params

    try {
        const result = await axiosClient.get(`?page=${page}&results=${count}&seed=${sort}`)
        return result.data.results
    } catch (error) {
        return error
    }
}

export async function getDetailUser(id) {
    try {
        /**
         * У сервиса по фейковой дате нет ендпоинта по детальному пользователю (через id или любое другое свойство)
         * поэтому в детальной карточке всегда генерируется случайный пользователь, но будем имитировать вид, что работает так как должно
        **/
        const result = await axiosClient.get(`?id=${id}`)
        return result.data.results
    } catch (error) {
        return error
    }

}
