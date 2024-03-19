import axios from "axios"

interface AXprops {
    url: string;
    method?: any;
    data?: Object | undefined;
    responseType?: any;
    headers?: any;
}

export const sendAxiosRequest = ({url, data, method, responseType}:AXprops) => {
    return axios({
        method: method,
        responseType: responseType,
        url: url,
        data: data,
        headers: {"Content-Type": "application/json; charset=UTF-8" },
    })
}