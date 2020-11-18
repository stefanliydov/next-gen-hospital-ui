import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DNATestDetailsFields } from '../shared/contants/contants';
import { IRunTest } from '../shared/model/IRunTest';
import { ITestResultDetails } from '../shared/model/ITestResultDetails';
import { DnaTestService } from '../shared/services/dna/dna-test.service';

@Component({
  selector: 'app-run-test',
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.scss']
})
export class RunTestComponent implements OnInit {

  currentTestResultsDetails: ITestResultDetails;

  runTestForm = this.fb.group({
    username: ['', Validators.required],
    dna: ['', [Validators.required, Validators.pattern('[ATGC]+')]],
    symptoms: ['']
  });

  constructor(private fb: FormBuilder,
    private dnaTestService: DnaTestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    if (id) {
      this.setCurrentTestResultDetails(id);
    }
  }

  onSubmit() {
    const dnaTest: IRunTest = this.extractInfoFromForm();
    this.dnaTestService.runTest(dnaTest)
      .pipe(take(1))
      .subscribe(testResult =>
        this.router.navigateByUrl(`test-result/details/${testResult.id}`),
        error => this.handleError(error)
      );

  }

  validateField(fieldName: string) {
    const field = this.runTestForm.get(fieldName);
    return field.invalid && field.touched;
  }

  private setCurrentTestResultDetails(id: string) {
    this.dnaTestService.getDnaTestById(id)
      .pipe(take(1))
      .subscribe(testResult => {
        this.currentTestResultsDetails = testResult;
        this.setFormValues();
      });

  }

  private extractInfoFromForm(): IRunTest {
    return {
      username: this.runTestForm.get(DNATestDetailsFields.USERNAME)?.value,
      dna: this.runTestForm.get(DNATestDetailsFields.DNA)?.value,
      symptoms: this.runTestForm.get(DNATestDetailsFields.SYMPTOMPS)?.value,
    }
  }

  private setFormValues() {
    this.runTestForm.get(DNATestDetailsFields.USERNAME).setValue(this.currentTestResultsDetails.userUsername);
    this.runTestForm.get(DNATestDetailsFields.DNA).setValue(this.currentTestResultsDetails.dna);
    this.runTestForm.get(DNATestDetailsFields.SYMPTOMPS).setValue(this.currentTestResultsDetails.symptoms);

  }

  private handleError(err): void {
    if (err.status == 404) {
      alert(err.error.error);
    }
  }
}
