import {AlertController, ToastController, LoadingController, Loading} from 'ionic-angular';

export class BaseCtrl {
  loading: Loading;

  constructor(protected alertCtrl: AlertController,
              protected toastCtrl: ToastController,
              protected loadingCtrl: LoadingController) {
  }

  displayErrorAlert(error: string = "网络不给力,请稍后重试!"): void {
    const prompt = this.alertCtrl.create({
      title: '错误',
      message: error,
      buttons: ['好的']
    });
    prompt.present();
  }

  displayMessageToast(message: string = "未找到相关结果!"): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }

  displayLoading(content: string = "正在加载中..."): void {
    let loading = this.loadingCtrl.create({
      content: content,
      spinner: 'hide',
      showBackdrop: true
    });
    loading.present();
    this.loading = loading;
  }
}
