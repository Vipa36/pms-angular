import { Component, OnInit } from '@angular/core';
import{Pdim} from '../ptable/ptable.model';
import {NgForm} from "@angular/forms";
import{PostsService} from '../ptable/ptable.services';

@Component({
  selector: 'app-adlete',
  templateUrl: './adlete.component.html',
  styleUrls: ['./adlete.component.css']
})
export class AdleteComponent implements OnInit {

  isAdd = false;
 
  toggleAdd() {
    this.isAdd = !this.isAdd;
  }

  isDel = false;
 
  toggleDel() {
    this.isDel = !this.isDel;
  }

  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
  }


  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.pname, form.value.desc, form.value.psize);
  }

  onDelete(form: NgForm){
    this.postsService.deletePost(form.value.delname);
  }

}
