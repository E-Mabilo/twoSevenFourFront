import { Component } from '@angular/core';
import { ShortestPathService } from './shortpart.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  data: string = '';
  result: string = '';
  source = '';
  destination = '';
  path: string[] = [];
  error: string | null = null;
  dataService: any;

  constructor(private shortestPathService: ShortestPathService) { }

  onSubmit() {
    this.shortestPathService.findShortestPath(this.source, this.destination).subscribe(
      data => {
        this.path = data.nodes || [];
        this.error = this.path.length ? null : 'No path found.';
      },
      err => {
        console.error('Error:', err);
        this.error = 'An error occurred while finding the path.';
      }
    );
  }

  onImportData() {
    let payload;
    try {
      payload = JSON.parse(this.data);
    } catch (e) {
      this.result = 'Invalid JSON data.';
      return;
    }

    this.dataService.importData(payload).subscribe(response => {
      if (response.success) {
        this.result = 'Data import was successful!';
      } else {
        this.result = 'Data import failed. Please try again.';
        if (response.details) {
          this.result += ` Details: ${response.details}`;
        }
      }
    }, error => {
      console.error('Error:', error);
      this.result = 'An error occurred while importing data.';
    });
  }
}
