(function() {
  var ImageUploader;

  ImageUploader = (function() {
    ImageUploader.imagePath = 'img/image.png';

    ImageUploader.imageSize = [600, 174];

    function ImageUploader(dialog) {
      this._dialog = dialog;
      this._dialog.bind('cancel', (function(_this) {
        return function() {
          return _this._onCancel();

        };
      })(this));
      this._dialog.bind('imageUploader.cancelUpload', (function(_this) {
        return function() {
          return _this._onCancelUpload();
        };
      })(this));
      this._dialog.bind('imageUploader.clear', (function(_this) {
        return function() {
          return _this._onClear();
        };
      })(this));
      this._dialog.bind('imageUploader.fileReady', (function(_this) {
        return function(files) {
          return _this._onFileReady(files);
        };
      })(this));
      this._dialog.bind('imageUploader.mount', (function(_this) {
        return function() {
          return _this._onMount();
        };
      })(this));
      this._dialog.bind('imageUploader.rotateCCW', (function(_this) {
        return function() {
          return _this._onRotateCCW();
        };
      })(this));
      this._dialog.bind('imageUploader.rotateCW', (function(_this) {
        return function() {
          return _this._onRotateCW();
        };
      })(this));
      this._dialog.bind('imageUploader.save', (function(_this) {
        return function() {
          return _this._onSave();
        };
      })(this));
      this._dialog.bind('imageUploader.unmount', (function(_this) {
        return function() {
          return _this._onUnmount();
        };
      })(this));
    }

    ImageUploader.prototype._onCancel = function() {};

    ImageUploader.prototype._onCancelUpload = function() {
      clearTimeout(this._uploadingTimeout);
      return this._dialog.state('empty');
    };

    ImageUploader.prototype._onClear = function() {
      return this._dialog.clear();
    };

    ImageUploader.prototype._onFileReady = function(file) {
      var formData,
          dialog = this._dialog;
      xhrProgress = function (ev) {
          dialog.progress((ev.loaded / ev.total) * 100);
      }

      xhrComplete = function (ev) {
          var response;
          if (ev.target.readyState != 4) {
              return;
          }

          xhr = null
          xhrProgress = null
          xhrComplete = null

          if (parseInt(ev.target.status) == 200) {

              response = JSON.parse(ev.target.responseText);
              image = {
                  size: response.size,
                  url: response.url
                };
              ImageUploader.imagePath = image.url;
              ImageUploader.imageSize = image.size;
              dialog.populate(image.url, image.size);

          } else {
              new ContentTools.FlashUI('no');
          }
      }

      dialog.state('uploading');
      dialog.progress(0);

      formData = new FormData();
      formData.append('image', file);

      xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', xhrProgress);
      xhr.addEventListener('readystatechange', xhrComplete);
      xhr.open('POST', '/upload', true);
      xhr.send(formData);

    };

    ImageUploader.prototype._onMount = function() {};

    ImageUploader.prototype._onRotateCCW = function() {
      var clearBusy;
      this._dialog.busy(true);
      clearBusy = (function(_this) {
        return function() {
          return _this._dialog.busy(false);
        };
      })(this);
      return setTimeout(clearBusy, 1500);
    };

    ImageUploader.prototype._onRotateCW = function() {
      var clearBusy;
      this._dialog.busy(true);
      clearBusy = (function(_this) {
        return function() {
          return _this._dialog.busy(false);
        };
      })(this);
      return setTimeout(clearBusy, 1500);
    };

    ImageUploader.prototype._onSave = function() {
      var clearBusy;
      this._dialog.busy(true);
      clearBusy = (function(_this) {
        return function() {
          _this._dialog.busy(false);
          return _this._dialog.save(ImageUploader.imagePath, ImageUploader.imageSize, {
            alt: 'Example of bad variable names'
          });
        };
      })(this);
      return setTimeout(clearBusy, 1500);
    };

    ImageUploader.prototype._onUnmount = function() {};

    ImageUploader.createImageUploader = function(dialog) {
      return new ImageUploader(dialog);
    };

    function rotateImage(direction) {
      // Request a rotated version of the image from the server
      var formData;

      // Define a function to handle the request completion
      xhrComplete = function (ev) {
          var response,
              dialog = this._dialog;
          // Check the request is complete
          if (ev.target.readyState != 4) {
              return;
          }
          // Clear the request
          xhr = null
          xhrComplete = null

          // Free the dialog from its busy state
          dialog.busy(false);

          // Handle the result of the rotation
          if (parseInt(ev.target.status) == 200) {
              // Unpack the response (from JSON)
              response = JSON.parse(ev.target.responseText);

              // Store the image details (use fake param to force refresh)
              image = {
                  size: response.size,
                  url: response.url + '?_ignore=' + Date.now()
                  };

              // Populate the dialog
              dialog.populate(image.url, image.size);

          } else {
              // The request failed, notify the user
              new ContentTools.FlashUI('no');
          }
      }

      // Set the dialog to busy while the rotate is performed
      dialog.busy(true);

      // Build the form data to post to the server
      formData = new FormData();
      formData.append('url', image.url);
      formData.append('direction', direction);

      // Make the request
      xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', xhrComplete);
      xhr.open('POST', '/rotate-image', true);
      xhr.send(formData);
    }


  return ImageUploader;

})();



  window.ImageUploader = ImageUploader;

  window.onload = function() {
    var editor, req;
    ContentTools.IMAGE_UPLOADER = ImageUploader.createImageUploader;
    ContentTools.StylePalette.add([
      new ContentTools.Style('By-line', 'article__by-line',['p']),
      new ContentTools.Style('Caption', 'article__caption', ['p']),
      new ContentTools.Style('Example', 'example', ['pre']),
      new ContentTools.Style('Example + Good', 'example--good', ['pre']),
      new ContentTools.Style('Example + Bad', 'example--bad', ['pre'])
    ]);

    editor = ContentTools.EditorApp.get();
    editor.init('.editable', 'data-name');

    editor.bind('save', function(regions, autoSave) {


      var name, payload, xhr;

      // Set the editor as busy while we save our changes
      this.busy(true);

      // Collect the contents of each region into a FormData instance
      console.log(regions);
      var data = '';
      for (name in regions) {
          if (regions.hasOwnProperty(name)) {
            console.log(regions[name]);
            data += regions[name];
          }
      }
      $.ajax({
        type: 'post',
        url: "/save-my-page",
        data: {"data": data},
        error: function(err) {
          new ContentTools.FlashUI('no');
        }
      })
      .done(function(data, textStatus, jqXHR) {
        if (textStatus == 4) {
          editor.busy(false);
          if (textStatus == '200') {
              // Save was successful, notify the user with a flash
              new ContentTools.FlashUI('ok');
          } else {
              // Save failed, notify the user with a flash
              new ContentTools.FlashUI('no');
          }
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        });


      // // Send the update content to the server to be saved
      // function onStateChange(ev) {
      //     // Check if the request is finished
      //     if (ev.target.readyState == 4) {
      //         editor.busy(false);
      //         if (ev.target.status == '200') {
      //             // Save was successful, notify the user with a flash
      //             new ContentTools.FlashUI('ok');
      //         } else {
      //             // Save failed, notify the user with a flash
      //             new ContentTools.FlashUI('no');
      //         }
      //     }
      // };
      // console.log(payload);
      // xhr = new XMLHttpRequest();
      // xhr.addEventListener('readystatechange', onStateChange);
      // xhr.open('POST', '/save-my-page');
      // xhr.send(payload);












      // console.log();
      // var saved;
      // editor.busy(true);  // 显示处理中图标
      // saved = (function() {
      //   return function() {
      //     editor.busy(false);
      //     return new ContentTools.FlashUI('ok');
      //   };
      // })(this);
      // return saved();




    });

  };
}).call(this);
