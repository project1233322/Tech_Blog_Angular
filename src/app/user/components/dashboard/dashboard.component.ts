import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../user-services/question-service/question.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatPaginatorModule,RouterModule, CommonModule, MatChipsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  questions: any[] = [];
  total!: number;
  pageNum: number = 0;
  tag: any;

  constructor(private service: QuestionService) {
    console.log(' dashboard called ')
  }
  ngOnInit() {
    console.log(' dashboard  ngInitcalled ')
    this.getAllQuestion();
  }

  getAllQuestion() {
    this.service.getAllQuestion(this.pageNum).subscribe((res)=> {
      console.log(res);
      
      this.questions=res.questionDTOs;
      
      console.log(this.questions);
      this.total=res.totalPages*5;

     

    })
  }
  pageIndexChange(event: any) {

    this.pageNum = event.pageIndex;

    this.getAllQuestion();
  }


}
