const $toggle = document.getElementById('toggle') as PaperToggleButtonElement;

if ($toggle) {
	const prizePictureFilterEnabled = nodecg.Replicant<boolean>('prizePictureFilterEnabled');

	prizePictureFilterEnabled.on('change', newVal => {
		$toggle.checked = Boolean(newVal);
	});

	$toggle.addEventListener('change', e => {
		if (e && e.target) {
			prizePictureFilterEnabled.value = Boolean((e.target as PaperToggleButtonElement).checked);
		}
	});
}
