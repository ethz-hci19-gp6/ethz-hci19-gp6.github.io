# Interface log processing

## How to use
1. Place the script at the same level as the folder containing logs
2. Make sure the logs folder is named "d"
3. `ruby log_analysis.rb`
4. The results are of the following format. Time measurements are all in seconds. Description omitted for obvious entries (e.g. "avg" for average and "SD" for standard deviation)
```ruby
Raw data user wise
{
    USER_ID => {
        TEST_NAME => TEST_TIME_IN_SEC,
    },
}
Raw data problem wise
{
    PROBLEM => {
        INTERFACE => {
            PROBLEM_VERSION => [
                TEST_TIME_IN_SEC,
            ]
        }
    }
}
User Average Completion Time: ..
User Completion Time SD: ..
{
    USER_ID => USER_AVERAGE_TIME_IN_SEC,
}

Problem Average Time with Interface
{
    PROBLEM => {
         "avg" => BOTH_IDE_COMBINED_AVERAGE_TIME_IN_SEC,
          "SD" => STANDARD_DEVIATION,
        "text" => {
            "avg" => ..,
             "SD" => ..
        },
         "gui" => {
            "avg" => ..,
             "SD" => ..
        }
    },
}

Problem Version Average Time
{
    PROBLEM => {
        VERSION => {
            "avg" => ..,
             "SD" => ..
        },
    },
}
```

## Analysis result for sample logs folder


```ruby
Raw data user wise
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
         "p1_va_gui" => 16.794,
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

Raw data problem wise
{
    "p1" => {
        "text" => {
            "va" => [
                [0] 60.851,
                [1] 107.146,
                [2] 248.895,
                [3] 14.364
            ],
            "vb" => [
                [0] 97.726,
                [1] 289.335
            ]
        },
         "gui" => {
            "vb" => [
                [0] 52.014,
                [1] 168.841,
                [2] 26.04,
                [3] 49.323
            ],
            "va" => [
                [0] 16.794,
                [1] 59.548
            ]
        }
    },
    "p2" => {
        "text" => {
            "vb" => [
                [0] 192.962,
                [1] 27.259
            ],
            "va" => [
                [0] 191.983,
                [1] 140.098,
                [2] 289.746
            ]
        },
         "gui" => {
            "va" => [
                [0] 105.579,
                [1] 8.255
            ],
            "vb" => [
                [0] 370.552,
                [1] 161.725,
                [2] 421.55,
                [3] 858.536
            ]
        }
    }
}

User Average Completion Time: 172.409
User Completion Time SD: 117.987
{
    "hI2ygTxa" => 102.852,
    "QqG5HYqn" => 209.631,
    "rjvqxhSu" => 144.19,
    "2KGZPtRZ" => 24.8,
    "5mZo33UN" => 178.69,
    "CRi82Ix2" => 374.291
}

Problem Average Time with Interface
{
    "p1" => {
         "avg" => 99.24,
          "SD" => 90.741,
        "text" => {
            "avg" => 136.386,
             "SD" => 108.624
        },
         "gui" => {
            "avg" => 62.093,
             "SD" => 54.805
        }
    },
    "p2" => {
         "avg" => 251.659,
          "SD" => 239.004,
        "text" => {
            "avg" => 168.41,
             "SD" => 95.664
        },
         "gui" => {
            "avg" => 321.033,
             "SD" => 306.951
        }
    }
}

Problem Version Average Time
{
    "p1" => {
        "va" => {
            "avg" => 84.6,
             "SD" => 87.434
        },
        "vb" => {
            "avg" => 113.88,
             "SD" => 99.777
        }
    },
    "p2" => {
        "va" => {
            "avg" => 147.132,
             "SD" => 104.179
        },
        "vb" => {
            "avg" => 338.764,
             "SD" => 292.46
        }
    }
}
```