import React from 'react';

const Lession1 = () => {
    const arr = [[1],[2],[3],[4],[5]];
    const objectX = {
        isbn: "123-456-222",
        author: {
          lastname: "Doe",
          firstname: "Jane"
        },
        editor: {
          lastname: "Smith",
          firstname: "Jane"
        },
        title: "The Ultimate Database Study Guide",
        category: [
          "Non-Fiction",
          "Technology"
        ]
    }

    const {isbn,author,editor,title,category} = {...objectX};
    console.log(isbn);
    // const [a,b,c,d,e] = arr;
    // console.log(a,b,c,d,e);
    return (
        <div>
            <h1>Lession - 1</h1>
            <p></p>
        </div>
    );
}

export default Lession1;
