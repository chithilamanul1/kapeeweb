$files = Get-ChildItem 'd:\desktop\kapee\public\clients\*.jpeg' | Sort-Object Name
$i = 1
foreach ($f in $files) {
    $newName = "client-$i.jpeg"
    Rename-Item $f.FullName -NewName $newName
    $i++
}
