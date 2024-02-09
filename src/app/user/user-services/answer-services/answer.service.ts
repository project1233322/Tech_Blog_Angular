import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from '../../../service/storage-service/storage-service.service';
import { Observable } from 'rxjs';

const BASIC_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { 

  }

  postAnswer(answerDTO:any) :Observable<any> {
    // answerDto.userId = StorageServiceService.getUserId();
    console.log("hello")
    console.log(answerDTO);
    return this.http.post<[]>(BASIC_URL + "answer",answerDTO,
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
  
}
