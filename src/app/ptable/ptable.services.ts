import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pdim} from './ptable.model';

@Injectable({providedIn: 'root'})
export class PostsService{
    private posts :Pdim[] =[];
    private postsUpdated =new Subject<Pdim []>();

    constructor(private http:HttpClient){}


    getPosts(){
        this.http.get<{message:string, posts:Pdim[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{
            this.posts=postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdatedListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(pname:string, desc: string, size: number){
        const post: Pdim={ id:null!, pname: pname, desc:desc, psize:size};
        this.http.post<{message: string}>("http://localhost:3000/api/posts", post).subscribe(responseData =>{
        console.log(responseData.message);        
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost(delname: string){
        this.http.delete("http://localhost:3000/api/posts/"+ delname).subscribe(()=>{
            console.log('Deleted');
        })
    }

}