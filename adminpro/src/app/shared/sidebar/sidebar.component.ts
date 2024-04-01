import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

declare let $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems: any[];

  public usuario:Usuario;

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    
    this.usuario = usuarioService.usuario;

    //console.log(this.menuItems);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menuItems = this.sidebarService.menu;
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $('#sidebarnav').AdminMenu();
  }
}
