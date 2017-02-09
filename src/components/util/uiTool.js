export function oneOf(one,validList)
{   
    for(let i=0;i<validList.length;i++){
        if(one === validList[i]){
            return true;
        }
    }
    return false;
}