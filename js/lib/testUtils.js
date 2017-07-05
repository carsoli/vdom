function assert(actual, expected){
   let flag = false;
   let obj1 = JSON.stringify(actual)
   let obj2 = JSON.stringify(expected)
   
   Object.keys(expected).map((key) => {
    if(actual.hasOwnProperty(key)){
        if(actual[key].value == expected[key].value){
            flag = true; 
        }
        else{
            flag = false; 
            console.log("value mismatch of property: " , key, "expected: ", expected[key].value , "but actual: " , actual[key].value )
        }
    }
    else console.log("expected property: ", key, "doesn't exist in actual object")
   });

//    for (var prop in obj1) {   
//     if (obj1.hasOwnProperty(prop)) {
//         if(obj2.hasOwnProperty(prop)){           
//             if(prop.value == obj2[prop].value){
//                 flag = true; 
//             }
//             else{
//                 flag: false;
//                 console.log("expected property: ", prop , "has a value", prop.value ,"that mismatches the actual object's property's value")
//             }
//         }
//         else{
//             flag = false;
//             console.log("expected property: ", prop , "does not exist in actual object")
//         }
//     }
//    }
   return flag;
}