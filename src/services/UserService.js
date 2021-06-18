import axios from "axios";
const url = "http://localhost:9000";

export async function login(data){
    const response=
        axios({
            method: "post",
            url: url+"/login",
            data
        });
        console.log(data);
        return await response;
}

export async function userDetails(data){
    const response=
        axios({
            method: "post",
            url: url+"/details",
            data
        });
        return await response;
}

export async function showDetails(){
    const response = axios({
        method: "get",
        url: url+"/displayDetails"
    });
    return await response;
}

export async function deleteUserDetails(id,value,name){
    const response = axios({
        method: "patch",
        url: "/patch",
        data:{id:id,value:value,name:name},
    });
    return response;
}