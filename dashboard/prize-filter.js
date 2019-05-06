"use strict";
const $toggle = document.getElementById('toggle');
if ($toggle) {
    const prizePictureFilterEnabled = nodecg.Replicant('prizePictureFilterEnabled');
    prizePictureFilterEnabled.on('change', newVal => {
        $toggle.checked = Boolean(newVal);
    });
    $toggle.addEventListener('change', e => {
        if (e && e.target) {
            prizePictureFilterEnabled.value = Boolean(e.target.checked);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpemUtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpemUtZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBNkIsQ0FBQztBQUU5RSxJQUFJLE9BQU8sRUFBRTtJQUNaLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwyQkFBMkIsQ0FBQyxDQUFDO0lBRXpGLHlCQUF5QixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDL0MsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbEIseUJBQXlCLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxRjtJQUNGLENBQUMsQ0FBQyxDQUFDO0NBQ0gifQ==