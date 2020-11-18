import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ITestResult } from '../shared/model/ITestResult';
import { DnaTestService } from '../shared/services/dna/dna-test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  testResults: ITestResult[] = [];
  testResultsFiltered: ITestResult[] = [];
  testResultsFilter: string = '';

  constructor(private dnaTestService: DnaTestService) { }

  ngOnInit(): void {
    this.fetchAllTests();
  }


  performSearch() {
    this.testResultsFiltered = this.testResults.filter(result => this.filterResultList(result));
  }

  private fetchAllTests() {
    this.dnaTestService.getAllDnaTests()
      .pipe(take(1))
      .subscribe(testResults => {
        this.testResults = testResults;
        this.performSearch()
      });
  }

  private filterResultList(result: ITestResult): boolean {
    return result.userName && result.userPhoneNumber &&
      result.userName.indexOf(this.testResultsFilter) !== -1 ||
      result.userPhoneNumber.indexOf(this.testResultsFilter) !== -1;
  }

}
