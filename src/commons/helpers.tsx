import {notification} from "antd";
import {NotificationType} from "./enum/NotificationType";
import {AxiosError} from "axios";


export function notifyApp(title: string, message: string, type: NotificationType = NotificationType.success) {
    notification[type]({
        message: title,
        description: message,
        duration: 5
    });
}


export function notifyAppAPIError() {
    notifyApp("API error", "The API return an error, please try again !", NotificationType.error);
}

export function handleError(error: AxiosError) {
    if(error && error.request) {
        const jsonError = JSON.parse(error.request.response);
        notifyApp('API Error', error.message + ' : ' + jsonError["hydra:description"], NotificationType.error);
    }

}

export function formatDatetime(date: any) {
    return new Date(date).toLocaleString ('FR');
}

function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
}
