#!/bin/sh

echo " " 
echo "実行開始..."
echo "GameHint の CSV ファイルを、_import/ に置いてください。" 
echo " " 

declare -a filenamelist=()
i=1
for naturefilename in _import/*.csv; do
  filename=${naturefilename:4}
    filenamelist+=(${filename##*/})
    echo "${i}: ${filename##*/}"
    let i++
done

echo " " 
echo "利用する、CSV ファイルの名前を選択してください。"; read key 
echo "ファイル名が、Challonge トーナメントのタイトルになります。"
echo " " 


node lib/bundle.js ${filenamelist[$key-1]%.*}
echo " " 
echo "実行終了"
