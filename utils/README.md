# Interface log processing

## How to use
1. Place the script at the same level as the folder containing logs
2. Make sure the logs folder is named "d"
3. `ruby log_analysis.rb`
4. The results are of the format
```ruby
{
    USER_ID => {
        TEST_NAME => TOTAL_TIME_IN_SEC,
        .
        .
        .
    },
    .
    .
    .
}
```

## Analysis result for sample logs folder


```ruby
{
    "hI2ygTxa" => {
        "p1_va_text" => 60.851,
         "p1_vb_gui" => 52.014,
        "p2_vb_text" => 192.962,
         "p2_va_gui" => 105.579
    },
    "QqG5HYqn" => {
        "p1_va_text" => 107.146,
         "p1_vb_gui" => 168.841,
        "p2_va_text" => 191.983,
         "p2_vb_gui" => 370.552
    },
    "rjvqxhSu" => {
        "p1_va_text" => 248.895,
         "p1_vb_gui" => 26.04,
        "p2_va_text" => 140.098,
         "p2_vb_gui" => 161.725
    },
    "2KGZPtRZ" => {
        "p1_va_text" => 14.364,
         "p1_vb_gui" => 49.323,
        "p2_vb_text" => 27.259,
         "p2_va_gui" => 8.255
    },
    "5mZo33UN" => {
         "p1_va_gui" => 168.438,
        "p1_vb_text" => 97.726,
         "p2_vb_gui" => 421.55
    },
    "CRi82Ix2" => {
        "p1_vb_text" => 289.335,
         "p1_va_gui" => 59.548,
        "p2_va_text" => 289.746,
         "p2_vb_gui" => 858.536
    }
}
```