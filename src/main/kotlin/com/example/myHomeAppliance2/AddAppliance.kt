package com.example.myHomeAppliance2

data class AddAppliance(val familyId: Int, val applianceName:String ,
                        val modelNumber: String, val makerId: Int,val categoryName: String,
                        val usePlaceId: Int, val buyDate: Long ,val buyAt: String)
