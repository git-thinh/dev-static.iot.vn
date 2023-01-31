const doOCR = async () => {
	console.log('doOCR .....')
		
	// var popupWindow = window.open(
	//     chrome.extension.getURL("popup.html"),
	//     "exampleName",
	//     "width=400,height=400"
	// );
	//window.close(); // close the Chrome extension pop-up
	
	const image = document.getElementById('image');
	const result = document.getElementById('result');

	const {
		createWorker
	} = Tesseract;
	
	const worker = createWorker({
		workerPath: chrome.runtime.getURL('js/worker.min.js'),
		langPath: chrome.runtime.getURL('traineddata'),
		corePath: chrome.runtime.getURL('js/tesseract-core.wasm.js'),
	});

	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	
	const {
		data: {
			text
		}
	} = await worker.recognize(image);
	console.log(text);
	result.innerHTML = `<p>OCR Result:</p><p>${text}</p>`;
	await worker.terminate();
}

const startBtn = document.getElementById('start-btn');
startBtn.onclick = doOCR;
