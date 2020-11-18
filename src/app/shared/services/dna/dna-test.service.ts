import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrl } from '../../contants/contants';
import { IRunTest } from '../../model/IRunTest';
import { ITestResult } from '../../model/ITestResult';
import { ITestResultDetails } from '../../model/ITestResultDetails';

@Injectable({
  providedIn: 'root'
})
export class DnaTestService {

  private readonly baseApiUrl = `${APIUrl.BACK_END_URL}/tests`;

  constructor(private http: HttpClient) { }

  runTest(dnaTest: IRunTest): Observable<ITestResult> {
    return this.http.post<ITestResult>(`${this.baseApiUrl}/run-test`, dnaTest);
  }

  getAllDnaTests(): Observable<ITestResult[]> {
    return this.http.get<ITestResult[]>(`${this.baseApiUrl}`);
  }

  getDnaTestById(id: string): Observable<ITestResultDetails> {
    return this.http.get<ITestResultDetails>(`${this.baseApiUrl}/${id}`)
  }
}
