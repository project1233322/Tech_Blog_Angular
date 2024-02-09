import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from '../../../service/storage-service/storage-service.service';




const BASIC_URL=["http://localhost:8080/"]
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  postQuestion(questionDto:any) :Observable<any> {
    questionDto.userId = StorageServiceService.getUserId();

    console.log(questionDto);
    return this.http.post<[]>(BASIC_URL + "question",questionDto,
    {
      headers:this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer "+StorageServiceService.getToken()
    )
  }

  getAllQuestion(pageNumber:number): Observable<any>{

    return this.http.get<[]>(BASIC_URL+`questions/page/${pageNumber}`,
    {
      headers:this.createAuthorizationHeader()
    });
  }

  getQuestionById(questionId:number): Observable<any>{

    return this.http.get<[]>(BASIC_URL+`questions/id/${questionId}`,
    {
      headers:this.createAuthorizationHeader()
    });
  }

  getQuestionByUserId(pageNumber:number): Observable<any>{

    return this.http.get<[]>(BASIC_URL+`questions/${StorageServiceService.getUserId()}/${pageNumber}`,
    {
      headers:this.createAuthorizationHeader()
    });
  }
  searchQuestionByTitle(title:string ,pageNumber:number): Observable<any>{

    return this.http.get<[]>(BASIC_URL+`search/${title}/${pageNumber}`,
    {
      headers:this.createAuthorizationHeader()
    });
  }
}
