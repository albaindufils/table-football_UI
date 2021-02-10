import {notification} from "antd";
import {NotificationType} from "./enum/NotificationType";


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

export function handleError(error: any) {
    const jsonError = JSON.parse(error.request.response);
    notifyApp('API Error', error.message + ' : ' + jsonError["hydra:description"], NotificationType.error);
}

export function formatDatetime(date: any) {
    return new Date(date).toLocaleString ('FR');
}
