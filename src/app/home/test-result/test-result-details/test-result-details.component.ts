import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITestResultDetails } from 'src/app/shared/model/ITestResultDetails';
import { DnaTestService } from 'src/app/shared/services/dna/dna-test.service';

@Component({
  selector: 'app-test-result-details',
  templateUrl: './test-result-details.component.html',
  styleUrls: ['./test-result-details.component.scss']
})
export class TestResultDetailsComponent implements OnInit {

  testResultsDetails$: Observable<ITestResultDetails>

  constructor(private route: ActivatedRoute,
    private dnaTestService: DnaTestService) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.testResultsDetails$ = this.dnaTestService.getDnaTestById(id);

  }

}
