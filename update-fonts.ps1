# Script para substituir todas as fontes por Figtree

$replacements = @{
    "font-\[NeometricRegular\]" = "font-[Figtree]"
    "font-\[NeometricBold\]" = "font-[Figtree] font-bold"
    "font-\[NeometricMedium\]" = "font-[Figtree] font-medium"
    "font-\[NeometricLight\]" = "font-[Figtree] font-light"
    "font-\[NeometricBlack\]" = "font-[Figtree] font-black"
    "font-\[NeometricItalic\]" = "font-[Figtree] italic"
    "font-\[CorsaBold\]" = "font-[Figtree] font-bold"
    "font-\[CorsaBlack\]" = "font-[Figtree] font-black"
    "font-\[ArminGroteskSemi\]" = "font-[Figtree] font-semibold"
    "font-\[ArminGroteskRegular\]" = "font-[Figtree]"
    "font-\[ArminGroteskBlack\]" = "font-[Figtree] font-black"
    "font-\[HaasRegular\]" = "font-[Figtree]"
    "font-\[HaasBold\]" = "font-[Figtree] font-bold"
    "font-\[HaasLight\]" = "font-[Figtree] font-light"
    "font-\[PlakRegular\]" = "font-[Figtree]"
    "font-\[PlakThin\]" = "font-[Figtree] font-light"
    "font-\[CarbonPlusRegular\]" = "font-[Figtree]"
    "font-\[CarbonPlusThin\]" = "font-[Figtree] font-light"
    "font-\[CarbonPlusBold\]" = "font-[Figtree] font-bold"
}

$files = Get-ChildItem -Path ".\src" -Include *.tsx,*.astro,*.ts,*.jsx,*.js -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    foreach ($key in $replacements.Keys) {
        if ($content -match $key) {
            $content = $content -replace $key, $replacements[$key]
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Atualizado: $($file.FullName)"
    }
}

Write-Host "`nConcluído! Todas as fontes foram substituídas por Figtree."
