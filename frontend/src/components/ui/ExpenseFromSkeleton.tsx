"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";

const ExpenseFormSkeleton = ({
  formSchema,
  configFields,
  onSubmit,
  members,
  defaultValues = {},
  isLoading = false
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [payersData, setPayersData] = useState([]);
  const [splitType, setSplitType] = useState("equally");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    clearErrors,
    trigger
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const watchedAmount = watch("amount");

  useEffect(() => {
    reset(defaultValues);
    setSelectedParticipants(defaultValues.participants || []);
    setSplitType(defaultValues.split_type || "equally");
    setPayersData(defaultValues.payers_data || []);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (selectedParticipants.length > 0 && watchedAmount) {
      const amount = parseFloat(watchedAmount);
      if (!isNaN(amount) && splitType === "equally") {
        const splitAmount = (amount / selectedParticipants.length).toFixed(2);
        setPayersData(prev =>
          prev.map(payer => ({
            ...payer,
            actual_amount: splitAmount
          }))
        );
      }
    }
  }, [selectedParticipants, watchedAmount, splitType]);

  useEffect(() => {
    setValue("payers_data", payersData);
    if (payersData.length > 0) {
      clearErrors("payers_data");
    }
    trigger("payers_data");
  }, [payersData, setValue, clearErrors, trigger]);

  const handleParticipantChange = (memberId, checked) => {
    setSelectedParticipants(prev => {
      const updated = checked
        ? [...prev, memberId]
        : prev.filter(id => id !== memberId);
      setValue("participants", updated);
      return updated;
    });
  };

  const addPayer = () => {
    const newPayer = {
      user_id: "",
      paid_amount: "",
      actual_amount:
        splitType === "equally" &&
        watchedAmount &&
        selectedParticipants.length > 0
          ? (parseFloat(watchedAmount) / selectedParticipants.length).toFixed(2)
          : "0.00" // ✅ Fix: default to "0.00" for unequal splits
    };

    setPayersData(prev => {
      const updated = [...prev, newPayer];
      console.log("Adding payer, new payersData:", updated);
      return updated;
    });
  };

  const removePayer = (index) => {
    setPayersData(prev => {
      const updated = prev.filter((_, i) => i !== index);
      console.log("Removing payer, new payersData:", updated);
      return updated;
    });
  };

  const updatePayer = (index, field, value) => {
    setPayersData(prev => {
      const updated = prev.map((payer, i) =>
        i === index ? { ...payer, [field]: value } : payer
      );
      console.log(`Updated payer ${index} ${field}:`, value, "Full payersData:", updated);
      return updated;
    });
  };

  const handleFormSubmit = (data) => {
    console.log("Form submission data:", data);
    console.log("PayersData state:", payersData);

    const formattedData = {
      ...data,
      participants: selectedParticipants,
      payers_data: payersData,
      group_id: defaultValues.group_id
    };

    console.log("Formatted data for submission:", formattedData);
    onSubmit(formattedData);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              step={field.step}
              placeholder={field.placeholder}
              {...register(field.name)}
              className={errors[field.name] ? "border-red-500" : ""}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name)}
              className={errors[field.name] ? "border-red-500" : ""}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={splitType}
              onValueChange={(value) => {
                setSplitType(value);
                setValue(field.name, value);
              }}
            >
              <SelectTrigger className={errors[field.name] ? "border-red-500" : ""}>
                <SelectValue placeholder="Select split type" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        );

      case "multiselect":
        return (
          <div key={field.name} className="space-y-2">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-3 max-h-32 overflow-y-auto">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`participant-${member.id}`}
                        checked={selectedParticipants.includes(member.id)}
                        onCheckedChange={(checked) => handleParticipantChange(member.id, checked)}
                      />
                      <Label
                        htmlFor={`participant-${member.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {member.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedParticipants.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex flex-wrap gap-2">
                      {selectedParticipants.map(participantId => {
                        const member = members.find(m => m.id === participantId);
                        return (
                          <Badge key={participantId} variant="secondary">
                            {member?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        );

      case "payers":
        return (
          <div key={field.name} className="space-y-2">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Payment Details</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPayer}
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Payer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {payersData.map((payer, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Payer {index + 1}</h4>
                      {payersData.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePayer(index)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Who paid? *</Label>
                        <Select
                          value={payer.user_id}
                          onValueChange={(value) => updatePayer(index, "user_id", value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select payer" />
                          </SelectTrigger>
                          <SelectContent>
                            {members.map(member => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-500">Paid Amount *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={payer.paid_amount}
                          onChange={(e) => updatePayer(index, "paid_amount", e.target.value)}
                          className="h-9"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-500">Their Share *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={payer.actual_amount}
                          onChange={(e) => updatePayer(index, "actual_amount", e.target.value)}
                          className="h-9"
                          disabled={splitType === "equally"}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {payersData.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <p className="text-sm">No payers added yet</p>
                    <p className="text-xs">Click "Add Payer" to start</p>
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-2">
                  Current payers: {payersData.length}
                </div>
              </CardContent>
            </Card>

            {errors.payers_data && (
              <p className="text-red-500 text-xs mt-1">
                {errors.payers_data?.message || "At least one payer is required"}
              </p>
            )}

            {payersData.length > 0 && payersData.some(payer => !payer.user_id || !payer.paid_amount || !payer.actual_amount) && (
              <p className="text-red-500 text-xs mt-1">
                Please fill in all payer details (who paid, paid amount, and their share)
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {configFields.map(renderField)}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading ? "Saving..." : (defaultValues.id ? "Update Expense" : "Create Expense")}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseFormSkeleton;
