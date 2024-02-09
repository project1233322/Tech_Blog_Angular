import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StorageServiceService } from '../../../service/storage-service/storage-service.service';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-question',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatSnackBarModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss'
})
export class ViewQuestionComponent {

  questionId: number = this.activatedRoute.snapshot.params["questionId"]
  question: any;
  validateForm!: FormGroup;
  answers:any[] = [];

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private answerService: AnswerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      body: [null, Validators.required]
    })
    this.getQuestionById();
  }

  getQuestionById() {
    this.questionService.getQuestionById(this.questionId).subscribe(
      (res) => {
        console.log(res);
        this.question = res.questionDTO;
        res.answerDTOList.forEach((element: any) => {
          this.answers.push(element);
        });
        this.answers.reverse();   //show the latest answers at top

      }
    )
  }

  addAnswer() {
    console.log(this.validateForm.value)
    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = StorageServiceService.getUserId();

    this.answerService.postAnswer(data).subscribe((res) => {
      console.log(res);
      if (res !== null) {
        this.snackBar.open("Answer submitted successfully", 'Close', { duration: 4000 });
      }

    }, (error: any) => {
      this.snackBar.open("Answer could not be posted, please try again later", 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    })
  }

}
