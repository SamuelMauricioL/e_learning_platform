import { Component, OnInit } from '@angular/core';
import {GetAlbumUseCases} from '../../../domain/usecase/get-album-use-case'
import { Album } from '../../../domain/models/Album/album';

@Component({
  providers: [],
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  constructor(private _getAlbumUseCase : GetAlbumUseCases) { }
  response$:any;
  album:Album = new Album();
  ngOnInit(): void {
    this.response$ = this._getAlbumUseCase.getAlbumById('12');
    this.response$.subscribe (
      (data: Album) => {
        this.album = data;
      }
    );
  }

}
