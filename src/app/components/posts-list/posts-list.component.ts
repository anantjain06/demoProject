import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
  PostData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'post_name', 'action'];

  constructor(private postApi: ApiService) {
   
  }

  ngOnInit() { 
     this.getAllposts();
  }
  getAllposts(){
    this.postApi.GetPosts().subscribe(data => {
      console.log(data);
          this.PostData = data;
          this.dataSource = new MatTableDataSource<Student>(this.PostData);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0);
        }) 
  }

  deletePost(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.postApi.DeletePost(e._id).subscribe()
    }
  }

  upvote(PostId){
      console.log(PostId);
       this.postApi.getIPAddress().subscribe((res:any)=>{
        var upvoteData = { ip_address:res.ip,post_id:PostId};
       
        this.postApi.GetUpvote(res.ip,PostId).subscribe(data => {
          if(data.length==0){
            this.postApi.AddUpVote(upvoteData).subscribe(res => {
               this.getAllposts();
            });
          }
        })    
      });;
  }

}