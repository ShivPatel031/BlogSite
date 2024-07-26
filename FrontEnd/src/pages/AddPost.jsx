import {PostForm,Container} from '../component/index.js';

function AddPost(){
    return <div className='py-8'>
        <Container>
            <PostForm ></PostForm>
        </Container>
    </div>
}

export {AddPost}