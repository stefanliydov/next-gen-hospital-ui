import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ITestResultDetails } from 'src/app/shared/model/ITestResultDetails';
import { DnaTestService } from 'src/app/shared/services/dna/dna-test.service';

@Component({
  selector: 'app-test-result-details',
  templateUrl: './test-result-details.component.html',
  styleUrls: ['./test-result-details.component.scss']
})
export class TestResultDetailsComponent implements OnInit {

  testResultsDetails: ITestResultDetails

  constructor(private route: ActivatedRoute,
    private dnaTestService: DnaTestService,
    private router: Router) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.dnaTestService.getDnaTestById(id).pipe(take(1)).subscribe(
      response => this.testResultsDetails = response,
      err => this.router.navigateByUrl('/')
    )
  }

}
