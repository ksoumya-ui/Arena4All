var Feed = require('../models/feed');

var createfeed = (req:any,res:any) =>{
    var params = req.body;
    var feed = new Feed();
    if (params.title && params.owner) {
        feed.title = params.title;
        feed.body = params.body;
        feed.owner = params.owner;
        feed.image = null;
        console.log("feed object",feed);
                feed.save((err: any, feedSaved: any) => {
                    if (err) {
                        console.log("Error at 13",err);
                        return res.status(500).send({message: "Saving user error."});
                    }
                        return res.status(200).send({feed: feedSaved});
                });
            } else {
        return res.status(200).send({message: 'Invalid Data.'});
    }
    
}

var fetchFeed = (req:any,res:any) =>{
    var page = 1;
    var itemsPerPage = 10;
    if (req.params.page) {
        page = req.params.page;
    }
        Feed.find({}).sort('createdAt').exec((err:any, posts:any, total:any) => {
            console.log('Inside fetch feed',posts);

            if (err)
                return res.status(500).send({message: "Get Feed error..."});
            if (!posts)
                return res.status(404).send({message: "Feed not found."});
                console.log('Response',posts)

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total / itemsPerPage),
                page,
                 itemsPerPage,
                posts
            });
        });
}


var getUserFeed = (req:any,res:any) =>{
    var itemsPerPage = 10;

    let userEmail =''
    userEmail = req.params?.user;
    Feed.find({owner: userEmail}).sort('createdAt').limit(itemsPerPage).exec((err:any, posts:any) => {
        console.log("Posts are",posts);
        if (err)
            return res.status(500).send({message: "Get Feed error..."});
        if (!posts)
            return res.status(404).send({message: "Posts not found."});
        return res.status(200).send({
            itemsPerPage,
            posts
        });
    });

}

var addViewer =(req:any,res:any) =>{
    var feedId = req.params.id;
    Feed.updateOne({_id:feedId}, {$inc : {'viewCount' : 1}}).exec((err:any, post:any) => {
        if (err)
            return res.status(500).send({message: "Add views  error..."});
        if (!post)
            return res.status(404).send({message: "Post not found."});

        return res.status(200).send({post});
    }) 

}

var addDownload =(req:any,res:any)=>{
    var feedId = req.params.id;
    Feed.updateOne({_id:feedId}, {$inc : {'downloadCount' : 1}}).exec((err:any, post:any) => {
        if (err)
            return res.status(500).send({message: "Add Like  error..."});
        if (!post)
            return res.status(404).send({message: "Post not found."});

        return res.status(200).send({post});
    }) 


}

var getPost = (req:any, res:any)=> {
    var feedId = req.params.id;
    Feed.find({_id:feedId}, (err:any, post:any) => {
        if (err)
            return res.status(500).send({message: "Get Post error..."});
        if (!post)
            return res.status(404).send({message: "Post not found."});

        return res.status(200).send({post});
    });
}

var deletePost = (req:any, res:any)=> {
    var feedId = req.params.id;
    Feed.find({_id:feedId}).remove((err:any) => {
        if (err)
            return res.status(500).send({message: "Post publication error..."});

        return res.status(200).send({message: 'Post deleted.'});
    });
}
var addLike =(req:any,res:any)=>{
    var feedId = req.params.id;
    Feed.updateOne({_id:feedId}, {$inc : {'likesCount' : 1}}).exec((err:any, post:any) => {
        if (err)
            return res.status(500).send({message: "Add Like  error..."});
        if (!post)
            return res.status(404).send({message: "Post not found."});

        return res.status(200).send({post});
    })
}

module.exports = {
    createfeed,
    fetchFeed,
    getUserFeed,
    addDownload,
    addViewer,
    addLike
}