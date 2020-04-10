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
        return docListCopy;

    } else if(action.type==='deleteDocument'){

        var docListCopy=[...docList];
        let index=docListCopy.findIndex(document => document._id == action.document._id);
        docListCopy.splice(index, 1);
        return docListCopy

    } else {
        return docList
    }
}