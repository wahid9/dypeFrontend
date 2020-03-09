export default function(docList=[], action){
    if(action.type==='getDocuments'){

        var docListCopy=[...docList];
        for(let i=0; i<action.documents.length; i++){
            docListCopy.push(action.documents[i])
        }
        return docListCopy;

    } else if(action.type==='addDocument'){

        var docListCopy=[...docList];
        docListCopy.push(action.document);
        console.log('action.document :', action.document);
        return docListCopy;

    } else {
        return docList
    }
}