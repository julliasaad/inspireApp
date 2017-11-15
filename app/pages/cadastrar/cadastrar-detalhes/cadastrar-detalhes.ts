import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';

import { ActivatedRoute } from '@angular/router';
import { Feedback } from "nativescript-feedback";
import { IUser } from '../../../interfaces/user';
import { LoadingProvider } from '../../../providers/loading-provider';
import { LoginProvider } from '../../../providers/login-provider';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Router } from '../../../providers/router-provider';
import { StateProvider } from '../../../providers/state-provider';
import { UserProvider } from '../../../providers/user-provider';

import dialogs = require("ui/dialogs");

@Component({
  moduleId: module.id,
  selector: "cadastrar-page",
  styleUrls: ['./cadastrar-detalhes.css'],
  templateUrl: './cadastrar-detalhes.html',
  providers: []
})

export class CadastrarDetalhesPage implements OnInit {
  private feedback: Feedback;
  private experience: boolean;
  private doubt: boolean;

	public user: IUser = {
    name: null,
    email: null,
    type: null,
    biography: null,
    id: null
  }

  constructor(
    private loadingProvider: LoadingProvider,
    private routerExtensions: RouterExtensions,
    private stateProvider: StateProvider,
    private loginProvider: LoginProvider,
    private userProvider: UserProvider,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {
    this.feedback = new Feedback();
  }

  ngOnInit() {
    this.loadingProvider.hide();
		this.route.queryParams.subscribe(params => {
      this.user.id = params['user'];
      this.user.email = params['email'];
    });
  }

  onEnviarTap() {
    this.loadingProvider.show("Analisando...");
    if(this.experience && !this.doubt) {
			this.user.type = 'inspirer';
      this.loadingProvider.hide();
      this.router.navigate(`/cadastrar/detalhes/biografia?user=${this.user.id}&type=${this.user.type}`);
    } else {
			this.loadingProvider.hide();
			dialogs.confirm({
				title: "Aqui você pode se inspirar!",
				message: "Vamos começar?!",
				okButtonText: "ok",
			}).then(function (result) {
				if(result) {
					this.routerExtensions.navigate([`/login/`]);
				}
			});
    }
  }

  onBackTap() {
    // this.hideKeyboard();
    this.routerExtensions.back();
  }
}