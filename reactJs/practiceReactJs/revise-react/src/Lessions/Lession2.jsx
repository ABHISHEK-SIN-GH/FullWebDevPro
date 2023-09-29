import React from 'react';

const Lession2 = () => {
    const arr = ["Apple","Cat","Ball","Cartoon","Banana","Avocado"];
    
    const filteredArr = arr.filter((item)=>{
                            return item[0]=='A';
                        });

    const totalFruitInOneLine = arr.reduce((pv,cv,index)=>{
        return pv+cv;
    },'')
      
    const totalFruit = arr.reduce((pv,cv,index)=>{
        return pv+1;
    },0)

    console.log(totalFruit);

    return (
        <div>
            <h1>Lession - 2</h1>
            <ul>
            {
                arr.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
                // filteredArr.map((item,index)=>{
                //     return <li key={index}>{item}</li>
                // })
            }
            </ul>
            <h4>Total Fruit: {totalFruit}</h4>
            <h4>Total Fruit: {totalFruitInOneLine}</h4>
        </div>
    );
}

export default Lession2;
