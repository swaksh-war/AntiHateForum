import React, { Component } from 'react'
import BlogsItem from './BlogsItem';
import Loader from './Loader';

export default class Blogs extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs : [],
            loading : false,

        }
    }

    async componentDidMount() {
        this.setState({loading : true});
        const url= "http://localhost:8000/get_post/"
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            blogs : parsedData.posts,
            loading : false
        });
        console.log(this.state);
    }

    render() {

        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        return (
            <>
                <div>this is blogs component</div>
                {this.state.blogs.map((element) => (
                    <BlogsItem
                        key={element.id}
                        index = {element.id}
                        title={element.title}
                        content={element.content}
                        created_at={element.created_at}
                    />
                ))}
            </>
        );
    }
}
