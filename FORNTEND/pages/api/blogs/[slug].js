import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';

export default async function handler(req, res) {
    const {slug} = req.query;
    await mongooseConnect();
    if(req.method === 'GET'){
        try{
            //fetch blog by slug
            const blog = await Blog.findOne({slug});

            if(!blog){
                return res.status(404).json({message:'Blog Not Found'})
            }

            //fetch comments for this blog
            const comments= await Comment.find({blog: blog._id}).sort({createdAt:-1});

            res.status(200).json({blog,comments})
        }catch(error){
            console.error(error);
            res.status(500).json({message:'Server error'})
        }
    }else if(req.method ==='POST'){
        try{
            const {name, email,title, contentpera, maincommnet,parent} = req.body;

            const blog = await Blog.findOne({slug});

            
        } catch(error){

        }
    }
}
