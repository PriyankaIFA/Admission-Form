import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PostOffice {
  District: string;
  State: string;
  Country: string;
}

interface PincodeResponse {
  Status: string;
  PostOffice: PostOffice[];
}

@Component({
  selector: 'app-postal',
  templateUrl: './postal.component.html',
  styleUrls: ['./postal.component.css']
})
export class PostalComponent {
  pincode: string | undefined;
  responseData: PincodeResponse[] | undefined;
  error: any;

  constructor(private http: HttpClient) {}

  searchPincode() {
    const url = `https://api.postalpincode.in/pincode/${this.pincode}`;

    this.http.get<PincodeResponse[]>(url).subscribe(
      (response) => {
        this.responseData = response;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  getCity(): string {
    return this.responseData?.[0]?.PostOffice[0]?.District ?? '';
  }
}