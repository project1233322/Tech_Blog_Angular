import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-questions-by-userid',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatPaginatorModule,RouterModule, CommonModule, MatChipsModule],
  templateUrl: './get-questions-by-userid.component.html',
  styleUrl: './get-questions-by-userid.component.scss'
})
export class GetQuestionsByUseridComponent {
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
    this.service.getQuestionByUserId(this.pageNum).subscribe((res) => {
      console.log(res);

      this.questions = res.questionDTOs;

      console.log(this.questions);
      this.total = res.totalPages * 5;



    })
  }
  pageIndexChange(event: any) {

    this.pageNum = event.pageIndex;

    this.getAllQuestion();
  }
}
