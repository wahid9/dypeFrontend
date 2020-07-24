export default function (favList=[],action){
    console.log('fffaaaaaavvvvvvv',action);
    if(action.type === 'annonceLiked'){
        var favListCopy=[...favList];
        favListCopy.push(action.annonceLiked);
        
        return favListCopy;
    }else if(action.type === 'annonceAddfromBdd'){
        var favListCopy = [...favList];
        for (var i=0; i< action.annonceLikedBdd.length; i++){
            favListCopy.push(action.annonceLikedBdd[i])
        }
    
        return favListCopy;
    }else if(action.type === 'deleteFav'){
        var favListCopy = [...favList];
        var index = favListCopy.findIndex(favs=>favs._id== action.fav._id)
        favListCopy.splice(index,1);
        return favListCopy;
    }else {
        return favList;
    }
}