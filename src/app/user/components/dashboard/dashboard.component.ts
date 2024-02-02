import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'
import { CommonModule } from '@angular/common';
import { O } from '@angular/cdk/keycodes';
import { QuestionService } from '../../user-services/question-service/question.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatPaginatorModule,CommonModule,MatChipsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
questions: any[]=[];
total:number=O;
pageNum:number=0;

constructor(private service:QuestionService){
console.log(' dashboard called ')
}
ngOninit(){
  console.log(' dashboard  ngInitcalled ')
  this.getAllQuestion();
}
  getAllQuestion() {
   
  }
  // getAllQuestion() {
  //  this.service.getAllQuestion(this.pageNum).subscribe(res)=>{
  //   console.log(res);
  //  }
  // }
pageIndexChange(event :any) {
this.pageNum=event.pageindex;
this.getAllQuestion();
}


}
