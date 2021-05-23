import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pdim } from './ptable.model';
import { PostsService } from './ptable.services';

@Component({
  selector: 'app-ptable',
  templateUrl: './ptable.component.html',
  styleUrls: ['./ptable.component.css'],
})
export class PtableComponent implements OnInit {
  posts: Pdim[] = [];
  private postsSub!: Subscription ;

  trs: { label: string; value: keyof Pdim }[] = [
    { label: 'Property Name', value: 'pname' },
    { label: 'Description', value: 'desc' },
    { label: 'Size', value: 'psize' },
  ];
  constructor(public postsService: PostsService) {

  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub= this.postsService.getPostUpdatedListener().subscribe((posts: Pdim[])=> {
      this.posts= posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}